import { redirect } from "next/navigation";

import { Form } from "@/components/Form";
import { Submit } from "@/components/Submit";
import { STATUS_CODES } from "http";

function LoginPage() {
  async function loginAction(_prevState: any, form: FormData) {
    "use server";

    const body = JSON.stringify({
      email: form.get("email"),
      password: form.get("password"),
    });

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/user/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body,
      }
    );

    const defaultError = {
      error:
        { status: response.status, message: response.statusText } ||
        "Unknown error.",
    };

    if (!response.ok) return;

    const data = await response.json();

    if (data.status === 200) {
      redirect("/products");
    } else if (data.status === 400 || data.status === 500) {
      return defaultError;
    } else {
      const statusText = STATUS_CODES[data.status] || "Unknown Status Code";
      return { error: statusText || "Unknown error." };
    }
  }

  return (
    <div className="m-2 h-full flex justify-center items-center">
      <div className="bg-white p-8 rounded shadow w-96">
        <h2 className="text-2xl mb-4 text-black">Login</h2>
        <Form action={loginAction}>
          <div>
            <label className="block text-sm text-gray-600">User Email</label>
            <input
              type="email"
              name="email"
              id="email"
              className="w-full p-2 rounded shadow mt-1 text-gray-500"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mt-2">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              className="w-full p-2 rounded shadow mt-1 text-gray-500"
            />
          </div>
          <div>
            <Submit
              type="submit"
              className="bg-blue-500 text-white  p-2 rounded w-full mt-4"
            >
              Enter
            </Submit>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default LoginPage;
