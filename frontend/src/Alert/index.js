import "./Alert.css";

/**
 * Alert renders an alert notification.
 */
function Alert({ alert }) {
  return (
    <div className="Alert">
      Mooo! {alert}
    </div>
  );
}

export default Alert;