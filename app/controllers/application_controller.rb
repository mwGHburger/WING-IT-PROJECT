class ApplicationController < ActionController::
  before_action :authenticate_user!
end
