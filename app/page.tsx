import { ContactForm } from "@/components/Form/form"

export default function Page() {
  return (
    <div className="mt-16 max-w-2xl mx-auto p-6 sm:p-8 bg-white rounded-lg shadow-lg dark:bg-gray-900">
      <div className="space-y-6">
        <div className="space-y-2">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Get in Touch</h2>
          <p className="text-gray-500 dark:text-gray-400">Fill out the form below to send us a message.</p>
        </div>
        <ContactForm />
      </div>
    </div>
  )
}
