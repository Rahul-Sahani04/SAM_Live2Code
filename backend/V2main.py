import tensorflow as tf
from tensorflow.keras.preprocessing.image import ImageDataGenerator
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Conv2D, MaxPooling2D, Flatten, Dense, Dropout
from tensorflow.keras.applications import MobileNetV2
from tensorflow.keras.optimizers import Adam as AdamLegacy
from tensorflow.keras.callbacks import EarlyStopping, LearningRateScheduler

# Set the number of classes and image size
num_classes = 35  # 10 digits + 26 letters
image_size = (224, 224)  # Adjust the image size as needed

# Data Augmentation and Preprocessing
datagen = ImageDataGenerator(
    rescale=1.0/255.0,  # Normalize pixel values to [0, 1]
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
    'data/train',
    target_size=image_size,
    batch_size=64,  # Adjust the batch size as needed
    class_mode='categorical',
    subset='training'
)

validation_generator = datagen.flow_from_directory(
    'data/validation',
    target_size=image_size,
    batch_size=64,
    class_mode='categorical',
    subset='validation'
)

# Build the Model (Using MobileNetV2 as a feature extractor)
base_model = MobileNetV2(
    input_shape=(224, 224, 3),
    include_top=False,
    weights='imagenet'
)

model = Sequential([
    base_model,
    tf.keras.layers.GlobalAveragePooling2D(),
    Dense(256, activation='relu'),
    Dropout(0.5),
    Dense(num_classes, activation='softmax')
])

optimizer = AdamLegacy(learning_rate=0.001)

# Compile the Model
model.compile(
    optimizer=optimizer, 
    loss='categorical_crossentropy', 
    metrics=['accuracy']
    )

# Define Learning Rate Scheduler
def learning_rate_scheduler(epoch):
    if epoch < 10:
        return 0.001
    else:
        return 0.0001

lr_scheduler = LearningRateScheduler(learning_rate_scheduler)

# Early Stopping
early_stopping = EarlyStopping(patience=10, restore_best_weights=True)

# Training the Model
history = model.fit(
    train_generator,
    epochs=10,  # Adjust the number of epochs as needed
    validation_data=validation_generator,
    callbacks=[lr_scheduler, early_stopping]
)

# Save the Model
model.save('sign_language_recognition_model.h5')

# Evaluate the Model on Test Data (Assuming you have a separate test dataset)
test_generator = datagen.flow_from_directory(
    'data/test',
    target_size=image_size,
    batch_size=64,
    class_mode='categorical'
)

test_loss, test_accuracy = model.evaluate(test_generator)

print(f'Test Loss: {test_loss}')
print(f'Test Accuracy: {test_accuracy}')
