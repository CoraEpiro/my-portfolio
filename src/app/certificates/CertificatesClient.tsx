"use client";

type Certificate = {
  id: number;
  title: string;
  issuer: string;
  category: 'Professional Certificate' | 'Specialization Certificate' | 'Diploma' | 'Course Certificate';
  issueDate: string;
  credentialId?: string;
  verifyUrl?: string;
  notes?: string;
  previewImage?: string;
};

const certificates: Certificate[] = [
  {
    id: 2,
    title: 'IBM Deep Learning with PyTorch, Keras and Tensorflow',
    issuer: 'Coursera',
    category: 'Specialization Certificate',
    issueDate: '4 May 2026',
    credentialId: '23WN50BTKV7Z',
    verifyUrl: 'https://www.coursera.org/account/accomplishments/specialization/certificate/23WN50BTKV7Z',
    notes: 'Deep learning fundamentals, PyTorch, Keras, and TensorFlow workflows.',
    previewImage: '/certificates/ibm_deep_learning_with_pytorch_keras_and_tensorflow.png',
  },
  {
    id: 1,
    title: 'Google Advanced Data Analytics',
    issuer: 'Coursera',
    category: 'Professional Certificate',
    issueDate: '2026',
    credentialId: 'LGR9L7X7L5RL',
    verifyUrl: 'https://coursera.org/verify/professional-cert/LGR9L7X7L5RL',
    notes: 'Advanced analytics, statistical methods, Python workflows, and practical business analysis.',
    previewImage: '/certificates/google-advanced-data-analytics-coursera.jpg',
  },
];

export default function CertificatesClient() {
  return (
    <main className="min-h-screen bg-white dark:bg-gray-900 py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-14">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Certificates
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Verified professional certificates and academic credentials. This section is structured to grow as new achievements are added.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {certificates.map((certificate) => (
            <article
              key={certificate.id}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200/70 dark:border-gray-700/70 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
            >
              {certificate.previewImage && (
                <a
                  href={certificate.verifyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block mb-5 overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700"
                >
                  <img
                    src={certificate.previewImage}
                    alt={`${certificate.title} certificate preview`}
                    className="w-full h-auto transition-transform duration-300 hover:scale-[1.02]"
                  />
                </a>
              )}
              <div className="flex items-center justify-between gap-3 mb-3">
                <span className="inline-flex rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-200 px-3 py-1 text-xs font-semibold">
                  {certificate.category}
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-400">Issued {certificate.issueDate}</span>
              </div>

              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">{certificate.title}</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-2">{certificate.issuer}</p>
              {certificate.credentialId && (
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Credential ID: {certificate.credentialId}</p>
              )}
              {certificate.notes && (
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">{certificate.notes}</p>
              )}

              <div className="flex flex-wrap gap-3">
                {certificate.verifyUrl && (
                  <a
                    href={certificate.verifyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center rounded-full bg-blue-600 text-white px-5 py-2.5 font-semibold hover:bg-blue-700 transition-colors"
                  >
                    Verify
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}