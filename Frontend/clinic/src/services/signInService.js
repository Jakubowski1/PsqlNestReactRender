import api from "../api";
export async function handleSignInSubmit(event, setErrorMessage, navigate) {
  event.preventDefault();
  setErrorMessage("");

  const formElements = event.currentTarget.elements;
  const data = {
    email: formElements.email.value,
    password: formElements.password.value,
    persistent: formElements.persistent.checked,
  };

  try {
    const response = await api.post("/auth/login", data);
    const responseData = response.data;

    // Save role and userId in localStorage
    localStorage.setItem("role", responseData.role);
    localStorage.setItem("userId", responseData.id);

    // Use passed `navigate` function to route based on role
    if (responseData.role === "manager") {
      navigate("/manager");
    } else if (responseData.role === "doctor") {
      navigate("/doctor");
    } else if (responseData.role === "patient") {
      navigate("/patient");
    }
  } catch (error) {
    setErrorMessage(
      `Error: ${error.response?.data?.message || "Invalid credentials"}`
    );
  }
}
