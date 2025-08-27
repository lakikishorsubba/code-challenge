import { DOMAIN } from "./config";

const wrapUser = (body) => ({ user: body });

export const registerApi = async (bodyObject) => {
  try {
    const response = await fetch(`${DOMAIN}/users`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(wrapUser(bodyObject)),
    });

    const data = await response.json();

    if (response.ok) return [data, ""]; // 200-299 success
    // Handle validation errors from Devise
    // Devise usually returns { "email": ["has already been taken"] }
    if (response.status === 422) {
      const errorMessage = data.email ? data.email.join(", ") : "Validation error";
      return ["", errorMessage];
    }

    return ["", data?.error || "Server returned an error"];
  } catch (error) {
    return ["", `Server down: ${error}`];
  }
};

export const loginApi = async (bodyObject) => {
  try {
    const response = await fetch(`${DOMAIN}/users/sign_in`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(wrapUser(bodyObject)), // wrap inside `user`
    });

    const data = await response.json();

    if (response.ok) return [data, ""];
    return ["", data?.error || "Invalid credentials"];
  } catch (error) {
    return ["", `Server down: ${error}`];
  }
};
