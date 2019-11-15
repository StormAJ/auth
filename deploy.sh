echo "Docker build .."
docker build -t arwedstorm/auth-api:latest -t arwedstorm/auth-api:$SHA ./api

echo "Push to docker-hub .."
docker push arwedstorm/auth-api:latest
docker push arwedstorm/auth-api:$SHA

echo "Update Kubernetes culster .. "
kubectl apply -f k8s
kubectl set image deployment auth-api-deployment auth-api=arwedstorm/auth-api:$SHA
