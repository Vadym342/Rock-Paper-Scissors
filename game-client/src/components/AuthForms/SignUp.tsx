import { FC, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { emailRegex } from "../../constants/constants";
import { AuthService } from "../../services/auth.service";
import { toast } from "react-toastify";
import { UserDataType } from "../../types/user.types";
import { useAppDispatch } from "../../store/hooks";
import { setCheckerForm } from "../../store/user/user.slice";

interface IFormInput {
  email: string;
  firstName: string;
  lastName: string;
  age: number;
  password: string;
}

export const SignUp: FC = () => {
  //! REMOVE BOILERPLATE CODE LOGIN/SIGNUP
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();

  const dispatch = useAppDispatch();

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prevState) => !prevState);
  };

  const handleSwitchForm = () => {
    dispatch(setCheckerForm(true));
  };

  const onSubmit: SubmitHandler<IFormInput> = async (data: UserDataType) => {
    try {
      const response = await AuthService.registration({
        ...data,
        age: +data.age,
      });

      if (response?.errors.length) {
        toast.error(response?.errors[0].message);
      }

      if (response) {
        toast.success("User has been created");
      }
    } catch (err: any) {
      toast.error(err);
    }
  };

  return (
    <section className="h-full m-5 ">
      <div className="g-6 flex h-full flex-wrap items-center justify-center text-neutral-800 dark:text-neutral-200">
        <div className="block rounded-lg bg-white shadow-lg dark:bg-neutral-800">
          <div className="w-96 md:mx-6 md:p-2">
            <div className="text-center">
              <img
                className="mx-auto w-48"
                src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/lotus.webp"
                alt="logo"
              />
              <h4 className="mb-5 mt-1 pb-1 text-xl font-semibold">
                Soft Team
              </h4>
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>
              <label className="block text-gray-700 text-sm font-bold">
                Email
              </label>
              <input
                {...register("email", {
                  required: true,
                  maxLength: 96,
                  pattern: emailRegex,
                })}
                className="my-2 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="Email"
                type="text"
                placeholder="Email"
              />
              {errors.email && (
                <div className="-mt-2 text-red-500 text-sm">
                  <span>
                    {errors.email.type === "required" &&
                      "This field is required"}
                    {errors.email.type === "maxLength" &&
                      "Max length 96 symbols"}
                    {errors.email.type === "pattern" &&
                      "Should be in email format 'someEmail@gmail.com'"}
                  </span>
                </div>
              )}

              <label className="block text-gray-700 text-sm font-bold">
                FirstName
              </label>
              <input
                {...register("firstName", { required: true, maxLength: 100 })}
                className="my-2 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="FirstName"
                type="text"
                placeholder="FirstName"
              />
              {errors.firstName && (
                <div className="-mt-2 text-red-500 text-sm">
                  <span>
                    {errors.firstName.type === "required" &&
                      "This field is required"}
                    {errors.firstName.type === "maxLength" &&
                      "Max length 100 symbols"}
                  </span>
                </div>
              )}

              <label className="block text-gray-700 text-sm font-bold">
                LastName
              </label>
              <input
                {...register("lastName", { required: true, maxLength: 100 })}
                className="my-2 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="LastName"
                type="text"
                placeholder="LastName"
              />
              {errors.lastName && (
                <div className="-mt-2 text-red-500 text-sm">
                  <span>
                    {errors.lastName.type === "required" &&
                      "This field is required"}
                    {errors.lastName.type === "maxLength" &&
                      "Max length 100 symbols"}
                  </span>
                </div>
              )}

              <label className="block text-gray-700 text-sm font-bold">
                Age
              </label>
              <input
                {...register("age", { required: true, min: 18, max: 100 })}
                className="my-2 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="Age"
                type="number"
                placeholder="Age"
              />
              {errors.age && (
                <div className="-mt-2 text-red-500 text-sm">
                  {errors.age.type === "required" && "This field is required"}
                  {errors.age.type === "min" && "Min value equal to 18"}
                  {errors.age.type === "max" && "Max value equal to 100"}
                </div>
              )}

              <div className="relative container">
                <label className="block text-gray-700 text-sm font-bold">
                  Password
                </label>
                <input
                  type={isPasswordVisible ? "text" : "password"}
                  {...register("password", {
                    required: true,
                    minLength: 5,
                    maxLength: 20,
                  })}
                  className="my-2 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="password"
                  placeholder="password"
                />
                <button
                  className="mt-5 absolute inset-y-0 right-0 flex items-center px-4 text-gray-600"
                  onClick={togglePasswordVisibility}
                >
                  {isPasswordVisible ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  )}
                </button>
                {errors.password && (
                  <div className="-mt-2 text-red-500 text-sm">
                    <span>
                      {errors.password.type === "required" &&
                        "This field is required"}
                      {errors.password.type === "minLength" &&
                        "Max length 5 symbols"}
                      {errors.password.type === "maxLength" &&
                        "Max length 20 symbols"}
                    </span>
                  </div>
                )}
              </div>

              <div className="mb-5 pb-1 pt-1 text-center">
                <div className="w-full">
                  <button
                    className="inline-block w-full rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_rgba(0,0,0,0.2)] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)]"
                    type="submit"
                    style={{
                      background:
                        "linear-gradient(to right, #ee7724, #d8363a, #dd3675, #b44593)",
                    }}
                  >
                    Sign up
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between pb-6">
                <p className="mb-0 mr-2">Have an account?</p>
                <div>
                  <button
                    onClick={handleSwitchForm}
                    type="button"
                    className="inline-block rounded border-2 border-danger px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-danger transition duration-150 ease-in-out hover:border-danger-600 hover:bg-neutral-500 hover:bg-opacity-10 hover:text-danger-600 focus:border-danger-600 focus:text-danger-600 focus:outline-none focus:ring-0 active:border-danger-700 active:text-danger-700 dark:hover:bg-neutral-100 dark:hover:bg-opacity-10"
                  >
                    Login
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
