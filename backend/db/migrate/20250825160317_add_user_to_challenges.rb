class AddUserToChallenges < ActiveRecord::Migration[8.0]
  def change
    add_reference :challenges, :user, foreign_key: true, null: false, default: 1
  end
end
