import { Bot, Layers, ArrowDown, CheckSquare } from 'lucide-react';

// Reusable component for content cards
const InfoCard = ({ title, icon, children }) => (
  <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-6 backdrop-blur-sm">
    <div className="flex items-center mb-3">
      <div className="p-2 bg-green-900/50 border border-green-700 rounded-md mr-4">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-green-400">{title}</h3>
    </div>
    <div className="space-y-3 text-white/80 text-base leading-relaxed">{children}</div>
  </div>
);

export default function ResultsPage() {
  return (
    <div className="relative min-h-screen w-full bg-black text-white">
      {/* Background Image & Overlay */}
      <div className="fixed inset-0 h-full w-full">
        <div
          className="h-full w-full bg-[url('/brain-scan.webp')] bg-cover bg-center bg-fixed"
        ></div>
        <div className="absolute inset-0 bg-black/80"></div>
      </div>
      
      {/* Main Content */}
      <main className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <header className="text-center mb-12">
          <Bot className="w-16 h-16 mx-auto text-green-400 mb-4" />
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white">
            Our Model's Architecture
          </h1>
          <p className="mt-4 text-lg text-white/70">
            An inside look at how our Convolutional Neural Network (CNN) processes MRI scans.
          </p>
        </header>

        <div className="space-y-8">
          <InfoCard title="Input Processing" icon={<Layers className="text-green-300" />}>
            <p>
              The model takes a standard MRI scan image (e.g., PNG, JPG, or DICOM) as its primary input. Before being fed into the network, each image undergoes a series of preprocessing steps:
            </p>
            <ul className="list-disc list-inside space-y-2">
              <li><strong>Resizing:</strong> The image is resized to a uniform dimension of 224x224 pixels to match the model's input layer.</li>
              <li><strong>Normalization:</strong> Pixel values, which typically range from 0 to 255, are normalized to a smaller range (usually 0 to 1). This helps the network learn more efficiently.</li>
              <li><strong>Grayscale Conversion:</strong> Although the model can handle color, it primarily focuses on the structural data, so images are often processed in grayscale to reduce complexity.</li>
            </ul>
          </InfoCard>

          <InfoCard title="CNN Model Architecture (.h5)" icon={<Bot className="text-green-300" />}>
            <p>
              Our model is a Convolutional Neural Network (CNN), a class of deep learning models well-suited for analyzing visual imagery. The architecture is saved in the standard Keras `.h5` format, which includes both the model's structure and its learned weights.
            </p>
            <p>
              The network consists of multiple layers designed to automatically and adaptively learn spatial hierarchies of features from the input images:
            </p>
             <ul className="list-disc list-inside space-y-2">
              <li><strong>Convolutional Layers:</strong> These layers apply various filters to the input image to create feature maps that highlight edges, textures, and other low-level patterns.</li>
              <li><strong>Pooling Layers:</strong> These layers reduce the spatial dimensions of the feature maps, which helps to decrease computational complexity and control overfitting.</li>
              <li><strong>Fully Connected Layers:</strong> After several convolutional and pooling layers, the high-level features are flattened and fed into fully connected layers, which perform the final classification task.</li>
            </ul>
          </InfoCard>

          <InfoCard title="Processing and Prediction" icon={<ArrowDown className="text-green-300" />}>
            <p>
              When an image is passed through the network, it's processed layer by layer. Each layer transforms the data, allowing the model to recognize increasingly complex patterns—from simple edges in the early layers to complex shapes and structures consistent with tumors in the later layers. The final layer uses a 'softmax' activation function to output a probability distribution over the possible classes (e.g., "Tumor" or "No Tumor").
            </p>
          </InfoCard>

          <InfoCard title="Output Result" icon={<CheckSquare className="text-green-300" />}>
            <p>
              The model's final output is a JSON object containing the prediction and a confidence score. For example:
            </p>
            <pre className="bg-gray-800 p-4 rounded-md text-sm text-white/90">
{`{
  "prediction": "Tumor Detected",
  "confidence": 0.985
}`}
            </pre>
            <p>
              The "prediction" is the class with the highest probability, and the "confidence" score represents the model's certainty in that prediction. This structured output is then used to display the clear, human-readable result on the analysis page.
            </p>
          </InfoCard>
        </div>
      </main>
    </div>
  );
}
