import { useState } from "react";
import { motion } from "framer-motion";

interface Props {
  onSuccess: () => void;
  onCancel: () => void;
}

export default function ParentalGate({ onSuccess, onCancel }: Props) {
  const [a] = useState(() => Math.floor(Math.random() * 8) + 2);
  const [b] = useState(() => Math.floor(Math.random() * 8) + 2);
  const [answer, setAnswer] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = () => {
    if (parseInt(answer, 10) === a + b) {
      onSuccess();
    } else {
      setError(true);
      setAnswer("");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[200] flex items-center justify-center bg-black/70"
      onClick={onCancel}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-card border border-primary/20 rounded-2xl p-6 max-w-xs w-full text-center space-y-4"
      >
        <p className="text-foreground font-bold text-lg">Parental Gate</p>
        <p className="text-muted-foreground text-sm">
          To continue, solve: {a} + {b} = ?
        </p>
        <input
          type="number"
          inputMode="numeric"
          value={answer}
          onChange={(e) => { setAnswer(e.target.value); setError(false); }}
          onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
          className="w-20 mx-auto block text-center text-xl bg-background border border-primary/30 rounded-lg p-2 text-foreground outline-none focus:border-primary"
          autoFocus
        />
        {error && <p className="text-red-400 text-xs">Try again</p>}
        <div className="flex gap-3 justify-center">
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded-lg text-sm text-muted-foreground hover:text-foreground transition"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 rounded-lg text-sm bg-primary text-primary-foreground font-medium hover:opacity-90 transition"
          >
            Confirm
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
