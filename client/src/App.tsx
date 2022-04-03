import Layout from "./components/layout";
import OnboardingForm from "./components/onboarding-form";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

import "./App.scss";

const App = () => (
  <Layout pageTitle="Recruiter | Home page">
    <h2 className="heading-secondary">Join our Global Network</h2>

    <p>Get hired by companies around the world</p>

    <OnboardingForm />

    <ToastContainer />
  </Layout>
);

export default App;
