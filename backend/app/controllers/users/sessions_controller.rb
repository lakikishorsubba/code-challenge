# frozen_string_literal: true

class Users::SessionsController < Devise::SessionsController
  respond_to :json
  include RackSessionFix

  def respond_with(resource, _opts = {})
    render json: {
      status: { message: 'Logged in sucessfully.'}, data: resource
    }, status: :ok
  end

  def respond_to_on_destroy
  jwt_payload = JWT.decode(request.headers['Authorization'].split(' ').last,
                           Rails.application.credentials.devise[:jwt_secret_key]).first rescue nil

  if jwt_payload
    render json: { status: 200, message: "Logged out successfully" }, status: :ok
  else
    render json: { status: 401, message: "Couldn't find an active session." }, status: :unauthorized
  end
end
end
