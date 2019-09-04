class PostsController < ApplicationController
  before_action :authenticate_user!, only: [:vote]
  before_action :set_post, only: [:show, :vote]
  respond_to :js, :json, :html # respond to JS on all actions

  def show
    set_post
  end

  def new
    @post = Post.new
    @post.user = current_user
  end

  def create
    @post = Post.new(post_params)
    @post.user = current_user
    if @post.save
      redirect_to map_path
    else
      render :new
    end
  end

  def vote # naming of action is important
    if !current_user.liked? @post
      @post.liked_by current_user # like post if it has not been liked
    elsif current_user.liked? @post
      @post.unliked_by current_user # unlike post if it has already been liked
    end
  end

  private

  def post_params
    params.require(:post).permit(:content, :photo, :latitude, :longitude)
  end

  def set_post
    @post = Post.find(params[:id])
  end
end
