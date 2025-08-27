# frozen_string_literal: true

class Users::RegistrationsController < Devise::RegistrationsController
  respond_to :json
  include RackSessionFix
  def respond_with(resource, _opts = {})
    if request.method == "POST" && resource.persisted?
      render json: {
        status: {message: "Signed up sucessfully.", data:resource },
      }, status: :ok
    elsif request.method == "DELETE"
      render json: {
        status: { message: "Account deleted successfully."}
      }, status: :ok
    else
      render json: {
        status: {message: "User couldn't be created successfully.",
        errors: resource.errors.full_messages.to_sentence
        },
      }, status: :unprocessable_entity
    end
  end
end
