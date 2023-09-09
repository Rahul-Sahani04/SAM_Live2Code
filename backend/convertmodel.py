# Convert the Model to TensorFlow.js format
# !pip install tensorflowjs
import tensorflowjs as tfjs

tfjs.converters.save_keras_model(model, 'tfjs_model')

print("Model conversion to TensorFlow.js format completed.")
