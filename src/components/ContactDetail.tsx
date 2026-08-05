type ContactDetailProps = {
  readonly onClose: () => void;
};

function ContactDetail({ onClose }: ContactDetailProps) {
  return (
  <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
    <button
      type="button"
      onClick={onClose}
      aria-label="Close contact details"
      className="absolute inset-0 cursor-default bg-black/50"
    />

    <dialog
      open
      aria-modal="true"
      aria-labelledby="contact-title"
      className="relative z-10 w-full max-w-md rounded-xl bg-white p-8 shadow-xl"
    >
      <button
        type="button"
        onClick={onClose}
        className="absolute right-4 top-3 text-2xl text-slate-500 hover:text-blue-600"
        aria-label="Close contact details"
      >
        ×
      </button>

      <h2
        id="contact-title"
        className="mb-6 text-3xl font-bold text-blue-600"
      >
        Contact
      </h2>

      <div className="space-y-4 text-slate-700">
        <p>
          <span className="font-semibold">Name:</span>{" "}
          Milagros López
        </p>

        <p>
          <span className="font-semibold">Email:</span>{" "}
          lopezmilagros003@gmail.com
        </p>

        <p>
          <span className="font-semibold">GitHub:</span>{" "}
          <a
            href="https://github.com/lopezmilagros"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            lopezmilagros
          </a>
        </p>

        <p>
          <span className="font-semibold">LinkedIn:</span>{" "}
          <a
            href="https://www.linkedin.com/in/milagros-lopez-0a302934b/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            Contact me on LinkedIn
          </a>
        </p>
      </div>
    </dialog>
  </div>
);
}
export default ContactDetail;