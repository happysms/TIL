# EC2 용량이 Full 일 때의 대처법

## 요약
- ```df -h``` 명령어로 용량 확인
- 루트볼륨 늘리기 (EBS 용량 늘리기)
- 파티션 크기 늘리기 (grwopart 명령)
- 파일시스템 크기 늘리기


### 용량 확인
```df -h``` 로 용량을 확인한다.

가득차 있고 용량이 더 필요한 상황이라면 먼저 EC2 에 접근하여 EBS 볼륨을 올린다.

![image](https://user-images.githubusercontent.com/70648382/208568645-428f0a31-e42e-49dd-ab7b-e75972b334d4.png)

![image](https://user-images.githubusercontent.com/70648382/208568704-e22a63c6-a916-4330-b7fb-a30962412b3d.png)


### EC2에서 변경된 volume 적용
```lsblk``` 명령어를 사용하여 인스턴스에 연결된 블록디바이스를 확인한다.

실제로 사용되고 있는 파티션의 크기를 늘린다.
```sudo growpart <volume> <partition number>```

<img width="371" alt="image" src="https://user-images.githubusercontent.com/70648382/208568856-bef5f9cc-6412-4261-8cdc-9fd571f88ee9.png">

아래 명령어로 파일 시스템의 크기를 늘린다.
```sudo xfs_growfs /dev/nvme0n1p1```

![image](https://user-images.githubusercontent.com/70648382/208569847-bc043353-3bb0-421b-bbe7-be6c8ddce7e8.png)

