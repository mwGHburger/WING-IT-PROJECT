class MapsController < ApplicationController
  def show
    @posts = Post.all
  end
end
