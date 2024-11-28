import { ChildrenProp } from "@/utils/definitions";

export default function Alert({children} : ChildrenProp){
  return (
    <div className="modal is-active">
      <div className="modal-content">
        {children}
      </div>
    </div>
  );
}

Alert.Success = function Success({message} : {message: string}) {
  return (
    <div className="notification is-info is-light has-text-centered">
      <p>{message}</p>
    </div>
  );
}

Alert.Error = function Error({message} : {message: string}) {
  return (
    <div className="notification is-danger is-light has-text-centered">
      <p>{message}</p>
    </div>
  );
}