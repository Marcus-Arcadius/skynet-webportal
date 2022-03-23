import PropTypes from "prop-types";
import { Formik, Form } from "formik";
import * as Yup from "yup";

import { TextField } from "../Form/TextField";
import { Button } from "../Button";

import accountsService from "../../services/accountsService";

const resetPasswordSchema = Yup.object().shape({
  password: Yup.string().required("Password is required").min(6, "Password has to be at least 6 characters long"),
  confirmPassword: Yup.string().oneOf([Yup.ref("password"), null], "Passwords must match"),
});

export const ResetPasswordForm = ({ token, onSuccess, onFailure }) => (
  <Formik
    initialValues={{
      password: "",
      confirmPassword: "",
    }}
    validationSchema={resetPasswordSchema}
    onSubmit={async ({ password, confirmPassword }) => {
      try {
        await accountsService.post("user/recover", {
          json: {
            token,
            password,
            confirmPassword,
          },
        });

        onSuccess();
      } catch {
        onFailure();
      }
    }}
  >
    {({ errors, touched }) => (
      <Form className="flex flex-col gap-4">
        <h3 className="mt-4 mb-8">Set your new password</h3>
        <TextField
          type="password"
          id="password"
          name="password"
          label="New password"
          error={errors.password}
          touched={touched.password}
        />
        <TextField
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          label="Confirm new password"
          error={errors.confirmPassword}
          touched={touched.confirmPassword}
        />

        <div className="flex w-full justify-center mt-4">
          <Button type="submit" className="px-12" $primary>
            Confirm
          </Button>
        </div>
      </Form>
    )}
  </Formik>
);

ResetPasswordForm.propTypes = {
  token: PropTypes.string.isRequired,
  onFailure: PropTypes.func.isRequired,
  onSuccess: PropTypes.func.isRequired,
};
