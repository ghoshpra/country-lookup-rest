# country-lookup-rest
country lookup REST service

Commands for creation of Docker image, pushing it to DockerHub and running on local Kubernete cluster 

docker build -t ghoshpra/country-lookup-rest .
docker run --rm -d -p 3000:3001 ghoshpra/country-lookup-rest
docker push ghoshpra/country-lookup-rest


http://localhost:3000/convert?countryName=India
http://localhost:3000/health



kubectl get node
kubectl create deployment --image ghoshpra/country-lookup-rest node-app 
deployment.apps/node-app created


PS C:\Users\pradi\Documents\MyPOC\country-lookup-rest> kubectl get all
NAME                            READY   STATUS    RESTARTS   AGE
pod/node-app-5cd6c48878-ktpg7   1/1     Running   0          2m55s

NAME                 TYPE        CLUSTER-IP   EXTERNAL-IP   PORT(S)   AGE
service/kubernetes   ClusterIP   10.96.0.1    <none>        443/TCP   10m

NAME                       READY   UP-TO-DATE   AVAILABLE   AGE
deployment.apps/node-app   1/1     1            1           2m55s

NAME                                  DESIRED   CURRENT   READY   AGE
replicaset.apps/node-app-5cd6c48878   1         1         1       2m55s

--------------------------------------------------------------------------
