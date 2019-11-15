REM Mandatory command to use ingress-nginx (s. ingress-nginx documentation: https://kubernetes.github.io/ingress-nginx/deploy/ )
REM Applies sercices and pods for managing traffic to http
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/master/deploy/static/mandatory.yaml

REM minikube addons enable ingress

REM Applies AWS specific loadbalancer service
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/master/deploy/static/provider/cloud-generic.yaml

REM Verify the service was enabled:
kubectl get svc -n ingress-nginx