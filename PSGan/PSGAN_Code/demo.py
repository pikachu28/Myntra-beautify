import argparse
from pathlib import Path

from PIL import Image
from psgan import Inference
from fire import Fire
import numpy as np

from psgan import PostProcess
from setup import setup_config, setup_argparser
import os
import dlib
from imageio import imread, imsave
import cv2
import matplotlib.pyplot as plt

detector = dlib.get_frontal_face_detector()  
sp = dlib.shape_predictor("assets/models/shape_predictor_5_face_landmarks.dat")

def align_faces(img):  #A function that returns an aligned face image when the original image is inserte
  dets = detector(img,1)
  objs = dlib.full_object_detections()
  for detection in dets:
    s = sp(img, detection)
    objs.append(s)
  faces = dlib.get_face_chips(img, objs, size=256, padding=0.35)
  return faces 

def save_align(test_faces):
    print(len(test_faces))
    fig, axes = plt.subplots(1, len(test_faces)+1, figsize=(20,16))
    #axes[0].imshow(test_img)
    for i, face in enumerate(test_faces):
        imsave('assets/images/makeup/result{}.jpg'.format(i), face)

img_size = 256
#save_path='transferred_image_'+str(i)+'.png'
def main(i=0):
    parser = setup_argparser()
    parser.add_argument(
        "--source_path",
        default="./assets/images/non-makeup/xfsy_0106.png",
        metavar="FILE",
        help="path to source image")
    parser.add_argument(
        "--reference_dir",
        default="assets/images/makeup",
        help="path to reference images")
    parser.add_argument(
        "--speed",
        action="store_true",
        help="test speed")
    parser.add_argument(
        "--device",
        default="cpu",
        help="device used for inference")
    parser.add_argument(
        "--model_path",
        default="assets/models/G.pth",
        help="model for loading")

    args = parser.parse_args()
    config = setup_config(args)
    # Using the second cpu
    inference = Inference(
        config, args.device, args.model_path)
    postprocess = PostProcess(config)

    source = Image.open(args.source_path).convert("RGB")
    reference_paths = list(Path(args.reference_dir).glob("*"))
    np.random.shuffle(reference_paths)
    for reference_path in reference_paths:
        if not reference_path.is_file():
            print(reference_path, "is not a valid file.")
            continue
        ds_store_file_location = '/Users/anjalisingh/Documents/PSGAN-master/assets/images/makeup/.DS_Store'
        if os.path.isfile(ds_store_file_location):
            os.remove(ds_store_file_location)
        #print(reference_path)
        reference = Image.open(reference_path).convert("RGB")
        makeup = align_faces(imread(reference_path))
        #print(no_makeup)
        save_align(makeup)
        reference = Image.open('assets/images/makeup/result0.jpg').convert("RGB")

        # Transfer the psgan from reference to source.
        image, face = inference.transfer(source, reference, with_face=True)
        source_crop = source.crop(
                (face.left(), face.top(), face.right(), face.bottom()))
        image = postprocess(source_crop, image)
        save_path='results/transferred_image_'+str(i)+'.png'
        i = i+1
        image.save(save_path)

        if args.speed:
            import time
            start = time.time()
            for _ in range(100):
                inference.transfer(source, reference)
                print("Time cost for 100 iters: ", time.time() - start)


if __name__ == '__main__':
    main()
