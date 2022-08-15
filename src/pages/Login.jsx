import { useCallback,useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useLogin,useSession } from '../contexts/AuthProvider';
import { useHistory } from 'react-router';
import LabelInput from '../components/LabelInput';
const validationRules = {
	email: {
		required: true
	},
	password: {
		required: true
	}
};

export default function Login() {
	const history = useHistory();
	const {loading,error,isAuthed} = useSession();
	const login = useLogin();
	const methods = useForm();
	const {
    handleSubmit,
		reset,
	} = methods;

	useEffect(() => {
		if (isAuthed) {
			history.replace('/');
		}
	}, [isAuthed, history]);
  const handleLogin = useCallback(async ({ email, password }) => {
		const success = await login(email,password);

		if(success){
			history.replace('/');
		}
		
	}, [login,history]);

	const handleCancel = useCallback(() => {
		reset();
	}, [reset]);

	return (
		<FormProvider {...methods}>
			<div className="mx-auto w-1/4">
				<h1>Sign in</h1>
				<form className="grid grid-cols-1 gap-y-4" onSubmit={handleSubmit(handleLogin)}>
				{
						error ? (
							<p className="text-red-500">
								{error}
							</p>
						) : null
					}
					<LabelInput
						label="email"
						type="text"
						defaultValue=""
						placeholder="your@email.com"
						validation={validationRules.email} />

					<LabelInput
						label="password"
						type="password"
						defaultValue=""
						validation={validationRules.password} />

					<div className="flex flex-row justify-end">
						<button type="submit" disabled={loading} className="disabled:opacity-50">
							Sign in
						</button>

						<button type="button" onClick={handleCancel}>
							Cancel
						</button>
					</div>
				</form>
			</div>
		</FormProvider>
	);
}