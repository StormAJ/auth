echo "Docker build .."
docker build -t arwedstorm/auth-api ./api

echo "Push to docker-hub .."
docker push arwedstorm/auth-api

echo "Update Kubernetes culster .. "
kubectl apply -f k8s
kubectl set image deployment auth-api-deployment auth-api=arwedstorm/auth-api:latest