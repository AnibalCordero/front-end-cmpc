import "../styles/components/ConfirmModal.css";

interface ConfirmModalProps {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export const ConfirmModal = ({
  message,
  onConfirm,
  onCancel,
}: ConfirmModalProps) => {
  return (
    <aside className="modal-backdrop">
      <div className="modal-content" role="dialog" aria-modal="true">
        <p>{message}</p>
        <div className="modal-actions">
          <button className="confirm" onClick={onConfirm}>
            Confirmar
          </button>
          <button className="cancel" onClick={onCancel}>
            Cancelar
          </button>
        </div>
      </div>
    </aside>
  );
};
