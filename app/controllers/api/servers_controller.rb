class Api::ServersController < ApplicationController

    def create
        @server = Server.new(server_params)
        if @server.save
            render :show
        else
            render json: @server.errors.full_messages, status: 422
        end
    end

    def show
        @server = Server.find_by(id: params[:id])
        if @server
            render :show
        else
            render json: ["Cannot find server"], status: 404
        end
    end

    def update
        @server = Server.find_by(id: params[:id])
        debugger
        @server.update(server_params)
        render :show
    end

    def index
        if current_user
            @servers = current_user.servers
        else
            @servers = Server.all
        end

        @members = []
        @serverusers = []

        @servers.each do |server|
            @members += server.members
            @serverusers += server.memberships
        end

        render :index
    end

    def join
        @server = Server.find_by(invite: params[:invite])

        if @server
            ServerUser.create!(user_id: current_user.id, server_id: @server.id)
            render :show
        else
            render json: ["Cannot find server"], status: 404
        end

    end

    def leave 
        @server = current_user.joined_servers.find_by(id: params[:id])

        if @server && @server.owner_id != current_user.id
            @server.members.delete(current_user)
            render :show
        else
            render json: ['Unable to leave server, please remove server instead!'], status: 400
        end
    end

    def server_params
        params.require(:server).permit(:name, :owner_id, :private, :profile_pic)
    end
end
