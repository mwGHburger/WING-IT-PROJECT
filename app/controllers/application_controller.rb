class ApplicationController < ActionController::Base
  before_action :authenticate_user!
  before_action :configure_permitted_parameters, if: :devise_controller?

  def configure_permitted_parameters
    # For additional fields in app/views/devise/registrations/new.html.erb
    devise_parameter_sanitizer.permit(:sign_up, keys: [:username, :photo])
  end

  # create helper method
  def bookmark_text
    @bookmark_exists ? '<i class="fas fa-bookmark"></i>' : '<i class="far fa-bookmark"></i>'
  end

  helper_method :bookmark_text
end
