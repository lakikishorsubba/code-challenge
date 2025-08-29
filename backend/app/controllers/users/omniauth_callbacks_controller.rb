class Users::OmniauthCallbacksController < Devise::OmniauthCallbacksController
  def google_oauth2
  @user = User.from_omniauth(request.env['omniauth.auth'])

  if @user.persisted?
    render json: {
      token: @user.generate_jwt,
      email: @user.email,
      name: @user.name,
      image: @user.image
    }
  else
    render json: { error: "Authentication failed" }, status: :unauthorized
  end
end
