# BeautyGAN

###  Introduction

BeautyGAN: Instance-level Facial Makeup Transfer with Deep Generative Adversarial Network




Papers and data sets are provided, but there is no open source code, and no trained models are provided

Recurring effect

#### Before Alignment of the face

![WhatsApp Image 2021-10-25 at 11 52 42 PM](https://user-images.githubusercontent.com/62153950/139117598-d3a23a85-d5ca-4a90-bfe4-dac04fc71df6.jpeg)


#### After Alignment of the face

![](result.jpg)

### Instructions

- Python3.6
- TensorFlow1.9

Download the trained model

- [https://pan.baidu.com/s/1wngvgT0qzcKJ5LfLMO7m8A](https://pan.baidu.com/s/1wngvgT0qzcKJ5LfLMO7m8A)，7lip
- [https://drive.google.com/drive/folders/1pgVqnF2-rnOxcUQ3SO4JwHUFTdiSe5t9](https://drive.google.com/drive/folders/1pgVqnF2-rnOxcUQ3SO4JwHUFTdiSe5t9)


new folder`model`，Put the model file in it

`imgs`Includes 11 pictures without makeup and 9 pictures with makeup

Default pair`imgs/no_makeup/xfsy_0068.png`Apply makeup

```
python main.py
```

If you need to apply makeup to other face pictures, just pass in the picture path. It is recommended to use a face picture of a suitable size

```
python main.py --no_makeup xxx.xxx
```
