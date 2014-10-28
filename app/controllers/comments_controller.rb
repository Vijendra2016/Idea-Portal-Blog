class CommentsController < ApplicationController
	def create
		p "hello"
		@article = Article.find(params[:article_id])
    	@comment = @article.comments.create(params[:comment])
    	 render :json => { 
	         :status => :ok, 
	         :message => "Success!",
	         :articles => @article,
	         :comments => @comment
          }.to_json
    end	
    def destroy
	    @article = Article.find(params[:article_id])
	    @comment = @article.comments.find(params[:id])
	    if @comment.destroy
	    	render :json => { 
	         :status => :ok, 
	         :message => "Success!"
	         }.to_json
	    else
	    	render :json => {
	    		:status => :unprocessable_entity,
	    		:message => "Failure!"
	    	}.to_json
	    end	
	end   
	def index
		p "hello123"
		@article =Article.find(params[:article_id])
		@comments =@article.comments.all
		render :json =>{
			:status =>:ok,
			:message => "Success!",
			:comments =>@comments
		}.to_json
	end 

end
