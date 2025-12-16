import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Animated,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { Card } from '@/components/Card';
import { Button } from '@/components/Button';
import { useRouter } from 'expo-router';
import { theme } from '@/constants/theme';

interface Exercise {
  id: string;
  name: string;
  sets: number;
  reps: string;
  rest: number; // segundos
  completed: boolean;
  setsCompleted: number[];
}

interface Workout {
  id: string;
  name: string;
  letter: string;
  exercises: Exercise[];
}

export default function ExerciciosScreen() {
  const router = useRouter();
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [currentWorkoutIndex, setCurrentWorkoutIndex] = useState(0);
  const [isWorkoutStarted, setIsWorkoutStarted] = useState(false);
  const [restTimer, setRestTimer] = useState(0);
  const [isRestTimerRunning, setIsRestTimerRunning] = useState(false);
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const timerInterval = useRef<NodeJS.Timeout | null>(null);

  // Dados mockados - serão substituídos por dados reais da API
  useEffect(() => {
    const mockWorkouts: Workout[] = [
      {
        id: '1',
        name: 'Treino A - Peito e Tríceps',
        letter: 'A',
        exercises: [
          {
            id: '1',
            name: 'Supino Reto',
            sets: 4,
            reps: '8-10',
            rest: 90,
            completed: false,
            setsCompleted: [],
          },
          {
            id: '2',
            name: 'Supino Inclinado',
            sets: 3,
            reps: '10-12',
            rest: 90,
            completed: false,
            setsCompleted: [],
          },
          {
            id: '3',
            name: 'Crucifixo',
            sets: 3,
            reps: '12-15',
            rest: 60,
            completed: false,
            setsCompleted: [],
          },
          {
            id: '4',
            name: 'Tríceps Pulley',
            sets: 3,
            reps: '12-15',
            rest: 60,
            completed: false,
            setsCompleted: [],
          },
        ],
      },
      {
        id: '2',
        name: 'Treino B - Costas e Bíceps',
        letter: 'B',
        exercises: [
          {
            id: '5',
            name: 'Barra Fixa',
            sets: 4,
            reps: 'Até a falha',
            rest: 90,
            completed: false,
            setsCompleted: [],
          },
          {
            id: '6',
            name: 'Remada Curvada',
            sets: 4,
            reps: '8-10',
            rest: 90,
            completed: false,
            setsCompleted: [],
          },
          {
            id: '7',
            name: 'Puxada Frontal',
            sets: 3,
            reps: '10-12',
            rest: 75,
            completed: false,
            setsCompleted: [],
          },
          {
            id: '8',
            name: 'Rosca Direta',
            sets: 3,
            reps: '12-15',
            rest: 60,
            completed: false,
            setsCompleted: [],
          },
        ],
      },
      {
        id: '3',
        name: 'Treino C - Pernas e Ombros',
        letter: 'C',
        exercises: [
          {
            id: '9',
            name: 'Agachamento Livre',
            sets: 4,
            reps: '8-10',
            rest: 120,
            completed: false,
            setsCompleted: [],
          },
          {
            id: '10',
            name: 'Leg Press',
            sets: 3,
            reps: '12-15',
            rest: 90,
            completed: false,
            setsCompleted: [],
          },
          {
            id: '11',
            name: 'Desenvolvimento',
            sets: 3,
            reps: '10-12',
            rest: 90,
            completed: false,
            setsCompleted: [],
          },
          {
            id: '12',
            name: 'Elevação Lateral',
            sets: 3,
            reps: '15-20',
            rest: 60,
            completed: false,
            setsCompleted: [],
          },
        ],
      },
    ];
    setWorkouts(mockWorkouts);
    // Define o treino do dia (por exemplo, Treino A)
    setCurrentWorkoutIndex(0);
  }, []);

  // Timer de descanso
  useEffect(() => {
    if (isRestTimerRunning && restTimer > 0) {
      timerInterval.current = setInterval(() => {
        setRestTimer((prev) => {
          if (prev <= 1) {
            setIsRestTimerRunning(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (timerInterval.current) {
        clearInterval(timerInterval.current);
        timerInterval.current = null;
      }
    }

    return () => {
      if (timerInterval.current) {
        clearInterval(timerInterval.current);
      }
    };
  }, [isRestTimerRunning, restTimer]);

  const currentWorkout = workouts[currentWorkoutIndex];

  const handlePreviousWorkout = () => {
    if (currentWorkoutIndex > 0) {
      setCurrentWorkoutIndex(currentWorkoutIndex - 1);
      setIsWorkoutStarted(false);
      setRestTimer(0);
      setIsRestTimerRunning(false);
    }
  };

  const handleNextWorkout = () => {
    if (currentWorkoutIndex < workouts.length - 1) {
      setCurrentWorkoutIndex(currentWorkoutIndex + 1);
      setIsWorkoutStarted(false);
      setRestTimer(0);
      setIsRestTimerRunning(false);
    }
  };

  const handleStartWorkout = () => {
    setIsWorkoutStarted(true);
    setCurrentExerciseIndex(0);
  };

  const handleCompleteSet = (exerciseId: string, setNumber: number) => {
    const updatedWorkouts = workouts.map((workout) => {
      if (workout.id === currentWorkout.id) {
        const updatedExercises = workout.exercises.map((exercise) => {
          if (exercise.id === exerciseId) {
            const newSetsCompleted = [...exercise.setsCompleted];
            if (newSetsCompleted.includes(setNumber)) {
              // Remove se já estava marcado
              const index = newSetsCompleted.indexOf(setNumber);
              newSetsCompleted.splice(index, 1);
            } else {
              // Adiciona se não estava marcado
              newSetsCompleted.push(setNumber);
            }

            const isCompleted = newSetsCompleted.length === exercise.sets;
            return {
              ...exercise,
              setsCompleted: newSetsCompleted,
              completed: isCompleted,
            };
          }
          return exercise;
        });
        return { ...workout, exercises: updatedExercises };
      }
      return workout;
    });
    setWorkouts(updatedWorkouts);
  };

  const handleStartRest = (restSeconds: number) => {
    setRestTimer(restSeconds);
    setIsRestTimerRunning(true);
  };

  const handleResetTimer = () => {
    setRestTimer(0);
    setIsRestTimerRunning(false);
  };

  const handleCompleteExercise = (exerciseId: string) => {
    const updatedWorkouts = workouts.map((workout) => {
      if (workout.id === currentWorkout.id) {
        const updatedExercises = workout.exercises.map((exercise) => {
          if (exercise.id === exerciseId) {
            const allSetsCompleted = Array.from({ length: exercise.sets }, (_, i) => i + 1);
            return {
              ...exercise,
              setsCompleted: allSetsCompleted,
              completed: true,
            };
          }
          return exercise;
        });
        return { ...workout, exercises: updatedExercises };
      }
      return workout;
    });
    setWorkouts(updatedWorkouts);
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const completedExercises = currentWorkout?.exercises.filter((ex) => ex.completed).length || 0;
  const totalExercises = currentWorkout?.exercises.length || 0;
  const progress = totalExercises > 0 ? (completedExercises / totalExercises) * 100 : 0;

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={[theme.colors.primary, '#2a4a5a']}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color={theme.colors.textLight} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Exercícios</Text>
          <View style={styles.placeholder} />
        </View>
      </LinearGradient>

      {currentWorkout && (
        <>
          {/* Seletor de Treino */}
          <View style={styles.workoutSelector}>
            <TouchableOpacity
              onPress={handlePreviousWorkout}
              disabled={currentWorkoutIndex === 0}
              style={[
                styles.selectorButton,
                currentWorkoutIndex === 0 && styles.selectorButtonDisabled,
              ]}
            >
              <Ionicons
                name="chevron-back"
                size={24}
                color={currentWorkoutIndex === 0 ? theme.colors.border : theme.colors.primary}
              />
            </TouchableOpacity>

            <View style={styles.workoutInfo}>
              <Text style={styles.workoutLetter}>Treino {currentWorkout.letter}</Text>
              <Text style={styles.workoutName}>{currentWorkout.name.split(' - ')[1]}</Text>
            </View>

            <TouchableOpacity
              onPress={handleNextWorkout}
              disabled={currentWorkoutIndex === workouts.length - 1}
              style={[
                styles.selectorButton,
                currentWorkoutIndex === workouts.length - 1 && styles.selectorButtonDisabled,
              ]}
            >
              <Ionicons
                name="chevron-forward"
                size={24}
                color={
                  currentWorkoutIndex === workouts.length - 1
                    ? theme.colors.border
                    : theme.colors.primary
                }
              />
            </TouchableOpacity>
          </View>

          {/* Progresso */}
          {isWorkoutStarted && (
            <View style={styles.progressContainer}>
              <View style={styles.progressBar}>
                <View style={[styles.progressFill, { width: `${progress}%` }]} />
              </View>
              <Text style={styles.progressText}>
                {completedExercises}/{totalExercises} exercícios completos
              </Text>
            </View>
          )}

          {/* Cronômetro de Descanso */}
          {restTimer > 0 && (
            <Card variant="elevated" style={styles.timerCard}>
              <View style={styles.timerContent}>
                <Ionicons name="time-outline" size={32} color={theme.colors.secondary} />
                <Text style={styles.timerText}>{formatTime(restTimer)}</Text>
                <View style={styles.timerButtons}>
                  {isRestTimerRunning ? (
                    <TouchableOpacity
                      onPress={() => setIsRestTimerRunning(false)}
                      style={styles.timerButton}
                    >
                      <Ionicons name="pause" size={20} color={theme.colors.textLight} />
                      <Text style={styles.timerButtonText}>Pausar</Text>
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity
                      onPress={() => setIsRestTimerRunning(true)}
                      style={styles.timerButton}
                    >
                      <Ionicons name="play" size={20} color={theme.colors.textLight} />
                      <Text style={styles.timerButtonText}>Continuar</Text>
                    </TouchableOpacity>
                  )}
                  <TouchableOpacity onPress={handleResetTimer} style={styles.timerButton}>
                    <Ionicons name="refresh" size={20} color={theme.colors.textLight} />
                    <Text style={styles.timerButtonText}>Resetar</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Card>
          )}

          <ScrollView
            style={styles.scrollView}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            {!isWorkoutStarted ? (
              <Card variant="elevated" style={styles.startCard}>
                <View style={styles.startContent}>
                  <Ionicons name="fitness" size={64} color={theme.colors.secondary} />
                  <Text style={styles.startTitle}>Pronto para começar?</Text>
                  <Text style={styles.startSubtitle}>
                    {currentWorkout.exercises.length} exercícios •{' '}
                    {currentWorkout.exercises.reduce((acc, ex) => acc + ex.sets, 0)} séries
                  </Text>
                  <Button
                    title="Iniciar Treino"
                    onPress={handleStartWorkout}
                    icon={<Ionicons name="play" size={20} color={theme.colors.textLight} />}
                    style={styles.startButton}
                  />
                </View>
              </Card>
            ) : (
              currentWorkout.exercises.map((exercise, index) => (
                <Card
                  key={exercise.id}
                  variant="elevated"
                  style={[
                    styles.exerciseCard,
                    exercise.completed && styles.exerciseCardCompleted,
                  ]}
                >
                  <View style={styles.exerciseHeader}>
                    <View style={styles.exerciseHeaderLeft}>
                      <View
                        style={[
                          styles.exerciseNumber,
                          exercise.completed && styles.exerciseNumberCompleted,
                        ]}
                      >
                        <Text style={styles.exerciseNumberText}>{index + 1}</Text>
                      </View>
                      <View style={styles.exerciseInfo}>
                        <Text style={styles.exerciseName}>{exercise.name}</Text>
                        <Text style={styles.exerciseDetails}>
                          {exercise.sets} séries × {exercise.reps} reps
                        </Text>
                      </View>
                    </View>
                    {exercise.completed && (
                      <Ionicons name="checkmark-circle" size={24} color={theme.colors.success} />
                    )}
                  </View>

                  <View style={styles.setsContainer}>
                    {Array.from({ length: exercise.sets }, (_, i) => i + 1).map((setNumber) => {
                      const isCompleted = exercise.setsCompleted.includes(setNumber);
                      return (
                        <TouchableOpacity
                          key={setNumber}
                          style={[
                            styles.setButton,
                            isCompleted && styles.setButtonCompleted,
                          ]}
                          onPress={() => handleCompleteSet(exercise.id, setNumber)}
                        >
                          <Text
                            style={[
                              styles.setButtonText,
                              isCompleted && styles.setButtonTextCompleted,
                            ]}
                          >
                            {setNumber}
                          </Text>
                        </TouchableOpacity>
                      );
                    })}
                  </View>

                  <View style={styles.exerciseActions}>
                    <TouchableOpacity
                      style={styles.restButton}
                      onPress={() => handleStartRest(exercise.rest)}
                    >
                      <Ionicons name="timer-outline" size={18} color={theme.colors.secondary} />
                      <Text style={styles.restButtonText}>
                        Descanso: {formatTime(exercise.rest)}
                      </Text>
                    </TouchableOpacity>

                    {!exercise.completed && (
                      <TouchableOpacity
                        style={styles.completeButton}
                        onPress={() => handleCompleteExercise(exercise.id)}
                      >
                        <Ionicons name="checkmark" size={18} color={theme.colors.success} />
                        <Text style={styles.completeButtonText}>Completar</Text>
                      </TouchableOpacity>
                    )}
                  </View>
                </Card>
              ))
            )}
          </ScrollView>
        </>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    paddingTop: 16,
    paddingBottom: 20,
    paddingHorizontal: theme.spacing.lg,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  backButton: {
    padding: theme.spacing.xs,
    marginLeft: -theme.spacing.xs,
  },
  headerTitle: {
    ...theme.typography.h2,
    color: theme.colors.textLight,
    flex: 1,
    textAlign: 'center',
  },
  placeholder: {
    width: 32,
  },
  workoutSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
    backgroundColor: theme.colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  selectorButton: {
    padding: theme.spacing.sm,
  },
  selectorButtonDisabled: {
    opacity: 0.3,
  },
  workoutInfo: {
    flex: 1,
    alignItems: 'center',
  },
  workoutLetter: {
    ...theme.typography.h1,
    color: theme.colors.primary,
    fontWeight: '700',
  },
  workoutName: {
    ...theme.typography.bodySmall,
    color: theme.colors.textSecondary,
    marginTop: 2,
  },
  progressContainer: {
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
    backgroundColor: theme.colors.surface,
  },
  progressBar: {
    height: 8,
    backgroundColor: theme.colors.border,
    borderRadius: theme.borderRadius.round,
    overflow: 'hidden',
    marginBottom: theme.spacing.xs,
  },
  progressFill: {
    height: '100%',
    backgroundColor: theme.colors.secondary,
    borderRadius: theme.borderRadius.round,
  },
  progressText: {
    ...theme.typography.caption,
    color: theme.colors.textSecondary,
    textAlign: 'center',
  },
  timerCard: {
    marginHorizontal: theme.spacing.lg,
    marginTop: theme.spacing.md,
    marginBottom: theme.spacing.xs,
    backgroundColor: theme.colors.primary,
  },
  timerContent: {
    alignItems: 'center',
  },
  timerText: {
    ...theme.typography.h1,
    color: theme.colors.textLight,
    fontWeight: '700',
    marginVertical: theme.spacing.md,
  },
  timerButtons: {
    flexDirection: 'row',
    gap: theme.spacing.md,
  },
  timerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    borderRadius: theme.borderRadius.md,
    gap: theme.spacing.xs,
  },
  timerButtonText: {
    ...theme.typography.bodySmall,
    color: theme.colors.textLight,
    fontWeight: '600',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: theme.spacing.lg,
    paddingBottom: theme.spacing.xl,
  },
  startCard: {
    alignItems: 'center',
    paddingVertical: theme.spacing.xxl,
  },
  startContent: {
    alignItems: 'center',
  },
  startTitle: {
    ...theme.typography.h2,
    color: theme.colors.text,
    marginTop: theme.spacing.lg,
    marginBottom: theme.spacing.sm,
  },
  startSubtitle: {
    ...theme.typography.body,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.xl,
  },
  startButton: {
    minWidth: 200,
  },
  exerciseCard: {
    marginBottom: theme.spacing.md,
  },
  exerciseCardCompleted: {
    opacity: 0.7,
    borderLeftWidth: 4,
    borderLeftColor: theme.colors.success,
  },
  exerciseHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  exerciseHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  exerciseNumber: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: theme.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: theme.spacing.md,
  },
  exerciseNumberCompleted: {
    backgroundColor: theme.colors.success,
  },
  exerciseNumberText: {
    ...theme.typography.bodySmall,
    color: theme.colors.textLight,
    fontWeight: '700',
  },
  exerciseInfo: {
    flex: 1,
  },
  exerciseName: {
    ...theme.typography.body,
    color: theme.colors.text,
    fontWeight: '600',
    marginBottom: 2,
  },
  exerciseDetails: {
    ...theme.typography.bodySmall,
    color: theme.colors.textSecondary,
  },
  setsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.sm,
    marginBottom: theme.spacing.md,
  },
  setButton: {
    width: 48,
    height: 48,
    borderRadius: theme.borderRadius.md,
    borderWidth: 2,
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
  },
  setButtonCompleted: {
    backgroundColor: theme.colors.secondary,
    borderColor: theme.colors.secondary,
  },
  setButtonText: {
    ...theme.typography.body,
    color: theme.colors.text,
    fontWeight: '600',
  },
  setButtonTextCompleted: {
    color: theme.colors.textLight,
  },
  exerciseActions: {
    flexDirection: 'row',
    gap: theme.spacing.sm,
    paddingTop: theme.spacing.md,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
  },
  restButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing.sm,
    backgroundColor: `${theme.colors.secondary}15`,
    borderRadius: theme.borderRadius.md,
    gap: theme.spacing.xs,
  },
  restButtonText: {
    ...theme.typography.bodySmall,
    color: theme.colors.secondary,
    fontWeight: '600',
  },
  completeButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing.sm,
    backgroundColor: `${theme.colors.success}15`,
    borderRadius: theme.borderRadius.md,
    gap: theme.spacing.xs,
  },
  completeButtonText: {
    ...theme.typography.bodySmall,
    color: theme.colors.success,
    fontWeight: '600',
  },
});


