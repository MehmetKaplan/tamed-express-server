echo -e "\n\x1b[0;31mThis should fail:\x1b[0m"
curl -d "props={a:1,b:2}" -X POST http://localhost:3000/init

echo -e "\n\x1b[0;31mThis should fail:\x1b[0m"
curl -d "props={a:1,b:2}" -X POST http://localhost:3000/constructor

echo -e "\n\x1b[0;31mThis should fail:\x1b[0m"
curl -d "props={a:1,b:2}" -X POST http://localhost:3000/destroyer

echo -e "\n\x1b[0;31mThis should fail:\x1b[0m"
curl -d "props={a:1,b:2}" -X POST http://localhost:3000/normalRoute

echo -e "\x1b[0;32mThis should succeed:\x1b[0m"
curl -d "props={a:1,b:2}" -X POST http://localhost:3000/normal-route

echo -e "\n\n\x1b[0;32mThis should succeed:\x1b[0m"
curl -d "props={a:1,b:2}" -X POST http://localhost:3000/folder1/folder2/normal-route

echo -e "\n\n\x1b[0;31mThis should fail:\x1b[0m"
curl -d "props={a:1,b:2}" -X POST http://localhost:3000/shouldBeExcluded

echo -e "\n\x1b[0;31mThis should fail:\x1b[0m"
curl -d "props={a:1,b:2}" -X POST http://localhost:3000/should-be-excluded

echo -e "\n\x1b[0;31mThis should fail:\x1b[0m"
curl -d "props={a:1,b:2}" -X POST http://localhost:3000/test/testRoute

echo -e "\x1b[0;32mThis should succeed:\x1b[0m"
curl -d "props={a:1,b:2}" -X POST http://localhost:3000/test/test-route

echo -e "\n\x1b[0;31mThis should fail:\x1b[0m"
curl -d "props={a:1,b:2}" -X POST http://localhost:3000/test/shouldBeExcludedTest

echo -e "\n\x1b[0;31mThis should fail:\x1b[0m"
curl -d "props={a:1,b:2}" -X POST http://localhost:3000/test/should-be-excluded-test
