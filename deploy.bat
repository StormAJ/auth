echo "Docker build .."
docker build -t arwedstorm/auth-api ./api
docker build -t arwedstorm/auth-gui ./gui

echo "Push to docker-hub .."
docker push arwedstorm/auth-api
docker push arwedstorm/auth-gui

echo "Update Kubernetes culster .. "
kubectl apply -f k8s
kubectl set image deployment auth-api-deployment auth-api=arwedstorm/auth-api:latest
kubectl set image deployment auth-gui-deployment auth-gui=arwedstorm/auth-gui:latest