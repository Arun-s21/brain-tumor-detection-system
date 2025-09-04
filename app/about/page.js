import { Brain, ShieldCheck, Activity, Target } from 'lucide-react';

// Reusable component for content cards
const InfoCard = ({ title, children }) => (
  <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-6 backdrop-blur-sm">
    <h3 className="text-4xl font-bold text-green-400 mb-3">{title}</h3>
    <div className="space-y-3 text-xl text-white/80 leading-relaxed">{children}</div>
  </div>
);

export default function AboutPage() {
  return (
    <div className="relative min-h-screen w-full bg-black text-white">
      {/* Background Image & Overlay */}
      <div className="fixed inset-0 h-full w-full">
        <div
          className="h-full w-full bg-[url('/ct-scan.webp')] bg-cover bg-center bg-fixed"
        ></div>
        <div className="absolute inset-0 bg-black/70"></div>
      </div>
      
      {/* Main Content */}
      <main className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <header className="text-center mb-12">
          <ShieldCheck className="w-16 h-16 mx-auto text-green-400 mb-4" />
          <h1 className="text-4xl sm:text-6xl font-extrabold text-white">
            About Our Brain Tumor Detection Model
          </h1>
          <p className="mt-4 text-2xl text-white/70">
            Leveraging AI to enhance early detection and diagnosis of brain tumors.
          </p>
        </header>

        <div className="space-y-8">
          <InfoCard title="Our Mission">
            <p>
              Our goal is to empower healthcare professionals and patients by providing a fast, 
              accurate, and accessible tool for detecting brain tumors using advanced artificial intelligence 
              and deep learning techniques. Early detection plays a crucial role in improving patient outcomes, 
              and our model is designed to support clinical decision-making.
            </p>
          </InfoCard>

          <InfoCard title="How the Model Works">
            <p>
              The Brain Tumor Detection Model is built using convolutional neural networks (CNNs), 
              a type of deep learning architecture proven effective in medical image analysis. 
              It processes MRI or CT scan images to identify abnormal patterns, classify tumors, 
              and assist doctors in making faster and more reliable diagnoses.
            </p>
            <ul className="list-disc list-inside space-y-2">
              <li>
                <strong>Image Preprocessing:</strong> Scans are normalized, enhanced, and prepared for analysis.
              </li>
              <li>
                <strong>Feature Extraction:</strong> The CNN learns unique patterns from the image data.
              </li>
              <li>
                <strong>Tumor Classification:</strong> The model predicts whether a tumor is present and, 
                in some cases, identifies its type or severity.
              </li>
            </ul>
          </InfoCard>

          <InfoCard title="Key Features">
            <ul className="list-disc list-inside space-y-2">
              <li>
                <strong>Accuracy:</strong> Trained on large medical datasets to ensure reliable results.
              </li>
              <li>
                <strong>Speed:</strong> Provides results in seconds, reducing diagnostic delays.
              </li>
              <li>
                <strong>Accessibility:</strong> Designed to be user-friendly for hospitals, clinics, 
                and even remote healthcare facilities.
              </li>
              <li>
                <strong>Security:</strong> Patient data privacy and compliance with healthcare standards 
                are built into the system.
              </li>
            </ul>
          </InfoCard>

          <InfoCard title="Future Scope">
            <p>
              While our model demonstrates strong potential in brain tumor detection, 
              we are continuously working on improvements such as:
            </p>
            <ul className="list-disc list-inside space-y-2">
              <li>Expanding detection capabilities to other neurological conditions.</li>
              <li>Integrating with hospital systems for real-time diagnostic support.</li>
              <li>Enhancing interpretability with explainable AI to support medical professionals.</li>
              <li>Collaborating with healthcare organizations to refine performance with real-world data.</li>
            </ul>
          </InfoCard>
        </div>
      </main>
    </div>
  );
}
