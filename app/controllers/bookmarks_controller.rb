class BookmarksController < ApplicationController
  def update
    # checks if favourite exists
    @bookmark = Bookmark.where(post: Post.find(params[:post]), user: current_user) # output is array
    if @bookmark === []
      # create bookmark
      Bookmark.create(post: Post.find(params[:post]), user: current_user)
      @bookmark_exists = true
    else
      # delete favourite
      @bookmark.destroy_all
      @bookmark_exists = false
    end

    # page render
    respond_to do |format|
      format.html {}
      format.js {}
    end

  end
end
