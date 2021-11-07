# Beautyify-Fit


One of the major issue in Online Beauty Products Shopping is finding the right fit for you. We bring the concept of pick what you feel good in online shopping using Beautyify-Fit. Using PSGan we perform Makeup Transfer from Reference image to Input Image.

### Technology Stack

   Programming Language: Python
   
   Tools:  PyTorch, Numpy, OpenCV
   
   Deep Learning: Generative Adversarial Network
   
   Algorithm: Pose and expression robust Spatial-aware GAN (PSGAN)
  
### Flow

1. Align the Makeup Reference Image to capture the features of the face precisely.
2. Pass  Aligned Reference and Input Image to PSGAN Algorithm. (PSGAN aligns the Input Image)
3. Get the Output as Makeup Transferred from Reference to Input image

### How to run

Save the input image with the name "xfsy_0106.png" in "assets/images/non-makeup" folder

Save reference images in "assets/images/makeup" folder

Run:

```
python test.py

```
OR

```
python test.py --reference_dir "location of folder which contains Reference makeup images"

```

Makeup transferred Images will be stored in "results" folder

### Results

<img width="741" alt="Screenshot 2021-11-07 at 10 56 38 AM" src="https://user-images.githubusercontent.com/62153950/140633565-478942f1-f177-4156-a447-7308b4f23321.png">

