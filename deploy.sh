echo "Docker build .."
docker build -t arwedstorm/auth-api:latest -t arwedstorm/auth-api:$SHA ./api
docker build -f ./gui/Dockerfiles/k8s-GS/Dockerfile -t arwedstorm/auth-gui:latest -t arwedstorm/auth-gui:$SHA ./gui

echo "Push to docker-hub .."
docker push arwedstorm/auth-api:latest
docker push arwedstorm/auth-api:$SHA
docker push arwedstorm/auth-gui:latest
docker push arwedstorm/auth-gui:$SHA

echo "Update kubernetes culster .. "
kubectl apply -f k8s
kubectl set image deployment auth-api-deployment auth-api=arwedstorm/auth-api:$SHA
kubectl set image deployment auth-gui-deployment auth-gui=arwedstorm/auth-gui:$SHA

echo "Setup https services .. "
kubectl apply -f k8s/HTTPS-GC