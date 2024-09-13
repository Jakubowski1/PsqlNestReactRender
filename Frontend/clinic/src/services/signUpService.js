import api from "../api";
export async function handleSignUpSubmit(event, setErrorMessage, navigate) {
  event.preventDefault();
  setErrorMessage("");

  const formElements = event.currentTarget.elements;

  const password = formElements.password.value;
  const password2 = formElements.password2.value;

  if (password !== password2) {
    setErrorMessage("Passwords do not match.");
    return;
  }

  const data = {
    email: formElements.email.value,
    password,
    name: formElements.name.value,
    surname: formElements.surname.value,
  };

  try {
    await api.post("/auth/register", data);
    setErrorMessage("Registration successful!");
    navigate("/signin"); // Redirect to sign-in page after successful registration
  } catch (error) {
    setErrorMessage(
      `Registration failed: ${
        error.response?.data?.message || "An error occurred."
      }`
    );
  }
}
