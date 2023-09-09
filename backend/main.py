import tensorflow as tf
from tensorflow.keras.preprocessing.image import ImageDataGenerator
from tensorflow.keras.layers import Flatten, Dense, Input

# Define your labels for characters 'A' to 'Z' and digits 1 to 9
labels = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "1", "2", "3", "4", "5", "6", "7", "8", "9"]

# Set the path to your data directory
data_dir = 'data'

# Set the image size and batch size
image_size = (256, 256)
batch_size = 64

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

# Define the model with the correct input shape
model = tf.keras.Sequential([
    Input(shape=(256, 256, 3)),  # Adjust input shape to match your image size and channels
    Flatten(),
    Dense(128, activation='relu'),
    Dense(len(labels), activation='softmax')  # Output layer has the same number of units as labels
])

# Compile the model
model.compile(
    optimizer='adam',
    loss='categorical_crossentropy',
    metrics=['accuracy']
)

# Train the model
model.fit(
    train_generator,
    epochs=50,
    validation_data=validation_generator
)

model.save('sign_language_recognition_model.h5')
