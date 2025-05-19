import { MaterialIcons } from "@expo/vector-icons";
import { useEffect, useRef, useState } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import PagerView from "react-native-pager-view";

export function Banner() {
  const [currentPage, setCurrentPage] = useState(0);
  const pagerRef = useRef<PagerView>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      if (pagerRef.current) {
        const nextPage = (currentPage + 1) % 3;
        pagerRef.current.setPage(nextPage);
      }
    }, 5000);

    return () => clearInterval(timer);
  }, [currentPage]);

  const bannerData = [
    {
      key: "1",
      image: require("../../assets/Imagem1.png"),
      title: "Mantenha-se hidratado",
      description: "Beber água regularmente melhora sua saúde e disposição",
    },
    {
      key: "2",
      image: require("../../assets/Imagem2.png"),
      title: "Acompanhe seu progresso",
      description: "Visualize seu consumo diário e atinja suas metas",
    },
    {
      key: "3",
      image: require("../../assets/Imagem3.png"),
      title: "Crie hábitos saudáveis",
      description: "Desenvolva uma rotina de hidratação consistente",
    },
  ];

  return (
    <View style={styles.container}>
      <PagerView
        style={styles.pagerView}
        initialPage={0}
        pageMargin={10}
        onPageSelected={(e) => setCurrentPage(e.nativeEvent.position)}
        ref={pagerRef}
      >
        {bannerData.map((item) => (
          <Pressable
            style={styles.bannerItem}
            key={item.key}
            onPress={() => console.log(`Clicou no Banner ${item.key}`)}
          >
            <Image source={item.image} style={styles.bannerImage} />
            <View style={styles.bannerOverlay}>
              <Text style={styles.bannerTitle}>{item.title}</Text>
              <Text style={styles.bannerDescription}>{item.description}</Text>
            </View>
          </Pressable>
        ))}
      </PagerView>

      {/* Indicadores de página */}
      <View style={styles.paginationContainer}>
        {bannerData.map((_, index) => (
          <Pressable
            key={index}
            style={[
              styles.paginationDot,
              currentPage === index && styles.paginationDotActive,
            ]}
            onPress={() => pagerRef.current?.setPage(index)}
          />
        ))}
      </View>

      <View style={styles.navigationContainer}>
        <Pressable
          style={styles.navigationButton}
          onPress={() => {
            const prevPage = (currentPage - 1 + 3) % 3;
            pagerRef.current?.setPage(prevPage);
          }}
        >
          <MaterialIcons name="chevron-left" size={24} color="#FFFFFF" />
        </Pressable>

        <Pressable
          style={styles.navigationButton}
          onPress={() => {
            const nextPage = (currentPage + 1) % 3;
            pagerRef.current?.setPage(nextPage);
          }}
        >
          <MaterialIcons name="chevron-right" size={24} color="#FFFFFF" />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 180,
    marginTop: 20,
    marginBottom: 16,
    borderRadius: 16,
    overflow: "hidden",
    position: "relative",
  },
  pagerView: {
    flex: 1,
  },
  bannerItem: {
    width: "100%",
    height: "100%",
    borderRadius: 16,
    overflow: "hidden",
    position: "relative",
  },
  bannerImage: {
    width: "100%",
    height: "100%",
    borderRadius: 16,
  },
  bannerOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0,0,0,0.4)",
    padding: 16,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
  },
  bannerTitle: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
  },
  bannerDescription: {
    color: "#F8FAFC",
    fontSize: 14,
  },
  paginationContainer: {
    position: "absolute",
    bottom: 12,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "rgba(255,255,255,0.5)",
    marginHorizontal: 4,
  },
  paginationDotActive: {
    backgroundColor: "#FFFFFF",
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  navigationContainer: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 12,
    pointerEvents: "box-none",
  },
  navigationButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
});
