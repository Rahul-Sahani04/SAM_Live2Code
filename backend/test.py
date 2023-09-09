labels = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "1", "2", "3", "4", "5", "6", "7", "8", "9"]


import tensorflow as tf
from tensorflow.keras.preprocessing.image import ImageDataGenerator
from tensorflow.keras.applications import MobileNetV2
from tensorflow.keras.layers import GlobalAveragePooling2D, Dense
from tensorflow.keras.models import Model


# Set the path to your data directory
data_dir = 'data'

# Set the image size and batch size
image_size = (224, 224)
batch_size = 32

# Data Augmentation and Preprocessing
datagen = ImageDataGenerator(
    rescale=1.0 / 255.0,  # Normalize pixel values to [0, 1]
    rotation_range=15,
    width_shift_range=0.1,
    height_shift_range=0.1,
    shear_range=0.2,
    zoom_range=0.2,
    horizontal_flip=True,
    vertical_flip=False,
    validation_split=0.2
)

train_generator = datagen.flow_from_directory(
    data_dir + '/train',
    target_size=image_size,
    batch_size=batch_size,
    class_mode='categorical',
    subset='training',
    classes=labels
)

validation_generator = datagen.flow_from_directory(
    data_dir + '/validation',
    target_size=image_size,
    batch_size=batch_size,
    class_mode='categorical',
    subset='validation',
    classes=labels
)

# Load MobileNetV2 as a base model
base_model = MobileNetV2(input_shape=(224, 224, 3), include_top=False, weights='imagenet')

# Freeze the layers of the base model
for layer in base_model.layers:
    layer.trainable = False

# Add custom top layers for your sign recognition task
x = GlobalAveragePooling2D()(base_model.output)
x = Dense(len(labels), activation='softmax')(x)

# Create the final model
model = Model(inputs=base_model.input, outputs=x)

# Compile the model
model.compile(
    optimizer='adam',
    loss='categorical_crossentropy',
    metrics=['accuracy']
)

# Train the model
model.fit(
    train_generator,
    epochs=5,  # Adjust the number of epochs as needed
    validation_data=validation_generator
)

model.save('sign_recognition_model.h5')


# Save the model in TensorFlow.js format
# tfjs.converters.save_keras_model(model, 'tfjs_model')
# ! tensorflowjs_converter --input_format keras mymodel.h5 tfjs_model 
# ! tensorflowjs_converter --input_format=keras_saved_model sign_recognition_model.h5 tfjs_model 

# tensorflowjs_converter \ --input_format=keras_saved_model \ ./ \ ./predict_signs_tfjs