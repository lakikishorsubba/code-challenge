class User < ApplicationRecord
  include Devise::JWT::RevocationStrategies::JTIMatcher

  # Standard Devise modules
  devise :database_authenticatable,
         :registerable,
         :recoverable,
         :rememberable,
         :validatable,
         :jwt_authenticatable, jwt_revocation_strategy: self

  # Omniauth module with providers
  devise :omniauthable, omniauth_providers: [:google_oauth2]

  # Create or find user from Google OAuth
  def self.from_omniauth(auth)
    user = where(provider: auth.provider, uid: auth.uid).first_or_initialize
    user.email = auth.info.email
    user.password = Devise.friendly_token[0, 20] if user.new_record?
    user.name = auth.info.name if user.respond_to?(:name)
    user.save!
    user
  end
end
