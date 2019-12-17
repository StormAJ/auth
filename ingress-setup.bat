REM Nginx-Ingress controller required w/ local and provider hosted  kubernetes cluser
REM Applies services and pods for managing traffic to http

REM Mandatory command to implement ingress-nginx (s. ingress-nginx documentation: https://kubernetes.github.io/ingress-nginx/deploy/ )
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/master/deploy/static/mandatory.yaml


REM Applies loadbalancer service (specific to local and GC)
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/master/deploy/static/provider/cloud-generic.yaml

REM Verify the service was enabled:
kubectl get svc -n ingress-nginx
kubectl get pods -n ingress-nginx

