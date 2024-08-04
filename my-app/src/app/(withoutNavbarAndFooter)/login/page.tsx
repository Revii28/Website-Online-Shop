export const dynamic = "force-dynamic"
import { loginAction } from "@/actions/auth";
export default function Login() {
  return (
    <div className="hero bg-gradient-to-r from-red-700 via-green-700 to-blue-700 min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Login now!</h1>
          <p className="py-6">
            Nikmati sensasi berbelanja yang menyenangkan dengan Customer Service
            yang siap membantumu selama 24 jam kapanpun kamu memerlukan bantuan!
          </p>
        </div>
        <div className="card bg-gradient-to-r from-red-500 via-green-500 to-blue-500 w-full max-w-sm shrink-0 shadow-2xl">
          <form className="card-body" action={loginAction}>
            <div className="form-control">
              <label className="label">
                <span className="label-text text-white">Email</span>
              </label>
              <input
                type="email"
                name="email"
                placeholder="email"
                className="input input-bordered bg-white text-black"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text text-white">Password</span>
              </label>
              <input
                type="password"
                name="password"
                placeholder="password"
                className="input input-bordered bg-white text-black"
                required
              />
              <label className="label">
                <a href="/register" className="label-text-alt link link-hover text-white">
                  Belum memiliki account?
                </a>
              </label>
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-primary">Login</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
