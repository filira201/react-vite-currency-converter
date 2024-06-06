const SwitchButton = ({ onClickSwitchButton }) => {
  return (
    <div
      onClick={onClickSwitchButton}
      className="span-container"
    >
      <span className="material-symbols-outlined">sync_alt</span>
    </div>
  );
};

export default SwitchButton;
