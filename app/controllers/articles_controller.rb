class ArticlesController < ApplicationController
	def new
    @article=Article.new
 	end
	def create
		@article = Article.new(params[:article])
   
		if @article.save
      render :json => { 
         :status => :ok, 
         :message => "Success!",
         :articles => @article
          }.to_json
		else 
      p "hjgj"
      render :json => { 
         :status => 500, 
         :message => "Failure!",
         :articles => params[:article]
          }.to_json
    end
  end
  def show
    p params[:id]
   	@article =Article.find(params[:id])
    render :json => { 
         :status => 200, 
         :message => "Success!",
         :articles => @article 
          }.to_json
  end	
  def index
    @articles = Article.all
  end	
  
  def edit
    @article =Article.find(params[:id])
    render :json => { 
         :status => 200, 
         :message => "Success!",
         :articles => @article 
          }.to_json
  end
  def update
    @article = Article.find(params[:id])
   
    if @article.update_attributes(params[:article])
      render :json => { 
         :status => 200, 
         :message => "Success!",
         :articles => @article 
          }.to_json
    else
      render :json => { 
         :status => 500, 
         :message => "Failure!",
         :articles => params[:article]
          }.to_json
    end
  end
  def destroy
    @article = Article.find(params[:id])
      if @article.destroy
        p "deleted"
        render :json => { 
           :status => :ok, 
           :message => "success!",
        }.to_json
      else
        p "not deleted"
        render :json => {
            :status => :unprocessable_entity,
            :message => "Failure"
        }.to_json     
      end
  end    
end
