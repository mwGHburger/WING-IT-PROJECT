class PostsController < ApplicationController
  before_action :authenticate_user!, only: [:vote]
  before_action :set_post, only: [:show, :vote]
  respond_to :js, :json, :html # respond to JS on all actions

  def index
    latMin = params[:latMin]
    latMax = params[:latMax]
    lngMin = params[:lngMin]
    lngMax = params[:lngMax]
    @posts = Post.where(["latitude > ?", latMin])
                 .where(["latitude < ?", latMax])
                 .where(["longitude > ?", lngMin])
                 .where(["longitude < ?", lngMax])
    respond_to do |format|
      format.html
      @post_markers = @posts.map do |post|
        {
          time: post.created_at.strftime("Posted on: %m/%d/%Y"),
          content: post.content,
          post_photo: post.photo.url,
          id: post.id,
          latitude: post.latitude,
          longitude: post.longitude,
          user: {
            name: post.user.username,
            photo: post.user.photo

          }
        }
      end
      format.json { render json: @post_markers }
    end
  end

  def show
    set_post
    @bookmark_exists = Bookmark.where(post: @post, user: current_user) ==   [] ? false : true
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
    @comment = Comment.new
  end
end
