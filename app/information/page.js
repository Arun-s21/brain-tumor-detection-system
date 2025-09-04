import { Brain, ShieldCheck, Activity, Target } from 'lucide-react';

// Reusable component for content cards
const InfoCard = ({ title, children }) => (
  <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-6 backdrop-blur-sm">
    <h3 className="text-4xl font-bold text-green-400 mb-3">{title}</h3>
    {/* Increased font size and line height for better readability */}
    <div className="space-y-3 text-xl text-white/80  leading-relaxed">{children}</div>
  </div>
);

export default function InformationPage() {
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
          <Brain className="w-16 h-16 mx-auto text-green-400 mb-4" />
          <h1 className="text-4xl sm:text-6xl font-extrabold text-white">
            Understanding Brain Tumors
          </h1>
          <p className="mt-4 text-2xl text-white/70">
            A comprehensive overview of brain tumors, their types, and their impact.
          </p>
        </header>

        <div className="space-y-8">
          <InfoCard title="What is a Brain Tumor?">
            <p>
              A brain tumor is a mass or growth of abnormal cells in the brain. Brain tumors can be cancerous (malignant) or noncancerous (benign). When benign or malignant tumors grow, they can cause the pressure inside your skull to increase. This can cause brain damage, and it can be life-threatening.
            </p>
          </InfoCard>

          <InfoCard title="Types of Brain Tumors">
            <p>
              There are over 120 types of brain and central nervous system (CNS) tumors. They are typically categorized as primary or metastatic.
            </p>
            <ul className="list-disc list-inside space-y-2">
              <li>
                <strong>Primary Tumors:</strong> These originate within the brain itself. They can be benign, like meningiomas, or malignant, like gliomas (e.g., glioblastoma), which are the most common type of malignant primary brain tumor.
              </li>
              <li>
                <strong>Metastatic (Secondary) Tumors:</strong> These are tumors that result from cancer that started elsewhere in the body and has spread to the brain. Common cancers that spread to the brain include lung, breast, colon, kidney, and melanoma.
              </li>
            </ul>
          </InfoCard>

          <InfoCard title="Severity and Progression">
            <p>
              The severity of a brain tumor is often graded on a scale from I to IV, with Grade I being the least aggressive and Grade IV being the most malignant and aggressive.
            </p>
            <ul className="list-disc list-inside space-y-2">
              <li>
                <strong>Grade I (Benign):</strong> Cells look nearly normal and grow slowly. Surgery alone may be an effective treatment.
              </li>
              <li>
                <strong>Grade II (Malignant):</strong> Cells look less normal than Grade I. They grow slowly but can invade nearby tissue and can recur as a higher-grade tumor.
              </li>
              <li>
                <strong>Grade III (Malignant):</strong> Cells look abnormal and are actively growing (anaplastic). They tend to recur, often as a higher grade.
              </li>
              <li>
                <strong>Grade IV (Malignant):</strong> Cells look most abnormal and grow and spread very quickly. Glioblastoma is a Grade IV tumor and is the most common and aggressive type.
              </li>
            </ul>
            <p>
              Progression varies greatly depending on the tumor's type, grade, location, and the patient's overall health. Early detection and accurate classification are critical for determining the best course of treatment and improving prognosis.
            </p>
          </InfoCard>
        </div>
      </main>
    </div>
  );
}
