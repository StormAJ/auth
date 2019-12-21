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

# echo "Install cert-manager with helm in cluster on google-cloud .."
# kubectl apply --validate=false -f https://raw.githubusercontent.com/jetstack/cert-manager/release-0.12/deploy/manifests/00-crds.yaml
# kubectl create namespace cert-manager
# helm repo add jetstack https://charts.jetstack.io
# helm repo update
# helm install \
#   --name cert-manager \
#   --namespace cert-manager \
#   --version v0.12.0 \
#   jetstack/cert-manager

# # Verfy:
# kubectl get pods --namespace cert-manager

# # NAME                                       READY   STATUS    RESTARTS   AGE
# # cert-manager-5c6866597-zw7kh               1/1     Running   0          2m
# # cert-manager-cainjector-577f6d9fd7-tr77l   1/1     Running   0          2m
# # cert-manager-webhook-787858fcdb-nlzsq      1/1     Running   0          2m

echo "Setup https services .. "
kubectl apply -f k8s/HTTPS-GC
