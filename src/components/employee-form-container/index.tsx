import EmployeeForm from "./employee-form";
import "./index.scss";

const EmployeeFormContainer = () => {
  return (
    <section className="employee-form__container">
      <div className="employee-form__image-container">
        <h2 className="heading-secondary">Join our Global Network</h2>

        <p>Get hired by companies around the world</p>
      </div>
      <EmployeeForm />
    </section>
  );
};

export default EmployeeFormContainer;
