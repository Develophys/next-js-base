import { redirect } from "next/navigation";

import { Form } from "@/components/Form";
import { Submit } from "@/components/Submit";

function LoginPage() {
  async function loginAction(prevState: any, form: FormData) {
    "use server";

    const response = await fetch("http://localhost:8000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: form.get("username"),
        password: form.get("password"),
      }),
    });

    if (response.ok) {
      const data = await response.json();
      redirect("/products");
    } else {
      const { message } = await response.json();
      return { error: message };
    }
  }

  return (
    <div className="m-2 h-full flex justify-center items-center">
      <div className="bg-white p-8 rounded shadow w-96">
        <h2 className="text-2xl mb-4 text-black">Login</h2>
        <Form action={loginAction}>
          <div>
            <label className="block text-sm text-gray-600">User</label>
            <input
              type="text"
              name="username"
              id="username"
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
